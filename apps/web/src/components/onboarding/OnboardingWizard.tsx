"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { StepModePicker } from "./StepModePicker";
import { StepIdentity } from "./business/StepIdentity";
import { StepBrandKit } from "./business/StepBrandKit";
import { StepBusinessModel } from "./business/StepBusinessModel";
import { StepRevenueGoal } from "./business/StepRevenueGoal";
import { StepIncome } from "./personal/StepIncome";
import { StepSavingsGoal } from "./personal/StepSavingsGoal";
import { ProgressBar } from "./ProgressBar";
import {
  saveOnboardingStep,
  uploadLogo,
  completeOnboarding,
} from "@/app/actions/onboarding";

type AppMode = "business" | "personal" | "both";
type BusinessType = "services" | "products" | "both";

type FormData = {
  appMode: AppMode;
  businessName: string;
  currency: string;
  logoUrl: string | null;
  brandColor: string;
  businessType: BusinessType;
  targetHourlyRate: number;
  monthlyRevenueGoal: number;
  monthlySalary: number;
  monthlySavingsGoal: number;
};

const initialFormData: FormData = {
  appMode: "business",
  businessName: "",
  currency: "USD",
  logoUrl: null,
  brandColor: "#00ADB5",
  businessType: "services",
  targetHourlyRate: 50,
  monthlyRevenueGoal: 0,
  monthlySalary: 0,
  monthlySavingsGoal: 0,
};

// Define step sequences for each mode
const businessSteps = ["identity", "brandKit", "businessModel", "revenueGoal"];
const personalSteps = ["income", "savingsGoal"];

export function OnboardingWizard() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const router = useRouter();

  // Calculate steps based on mode
  const getSteps = useCallback(() => {
    const steps = ["modePicker"];
    if (formData.appMode === "business" || formData.appMode === "both") {
      steps.push(...businessSteps);
    }
    if (formData.appMode === "personal" || formData.appMode === "both") {
      steps.push(...personalSteps);
    }
    return steps;
  }, [formData.appMode]);

  const steps = getSteps();
  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex];

  const updateFormData = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoChange = (file: File) => {
    setLogoFile(file);
    // Create local preview URL
    const previewUrl = URL.createObjectURL(file);
    updateFormData("logoUrl", previewUrl);
  };

  const saveCurrentStep = async () => {
    setIsLoading(true);
    try {
      // Upload logo if changed
      if (logoFile && currentStep === "brandKit") {
        const formDataObj = new FormData();
        formDataObj.append("file", logoFile);
        const result = await uploadLogo(formDataObj);
        if (result.success && result.url) {
          updateFormData("logoUrl", result.url);
        }
        setLogoFile(null);
      }

      // Save form data
      await saveOnboardingStep({
        appMode: formData.appMode,
        businessName: formData.businessName || undefined,
        currency: formData.currency,
        logoUrl: formData.logoUrl || undefined,
        brandColor: formData.brandColor,
        businessType: formData.businessType,
        targetHourlyRate: formData.targetHourlyRate || undefined,
        monthlyRevenueGoal: formData.monthlyRevenueGoal || undefined,
        monthlySalary: formData.monthlySalary || undefined,
        monthlySavingsGoal: formData.monthlySavingsGoal || undefined,
      });
    } catch (error) {
      console.error("Error saving step:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    await saveCurrentStep();

    if (currentStepIndex < totalSteps - 1) {
      setDirection(1);
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Complete onboarding
      setIsLoading(true);
      await completeOnboarding();
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "modePicker":
        return true;
      case "identity":
        return formData.businessName.trim().length > 0;
      case "brandKit":
        return true; // Logo and color are optional
      case "businessModel":
        if (formData.businessType === "services") {
          return formData.targetHourlyRate > 0;
        }
        return true;
      case "revenueGoal":
        return formData.monthlyRevenueGoal > 0;
      case "income":
        return formData.monthlySalary > 0;
      case "savingsGoal":
        return formData.monthlySavingsGoal > 0;
      default:
        return true;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case "modePicker":
        return (
          <StepModePicker
            value={formData.appMode}
            onChange={(mode) => updateFormData("appMode", mode)}
          />
        );
      case "identity":
        return (
          <StepIdentity
            businessName={formData.businessName}
            currency={formData.currency}
            onBusinessNameChange={(value) =>
              updateFormData("businessName", value)
            }
            onCurrencyChange={(value) => updateFormData("currency", value)}
          />
        );
      case "brandKit":
        return (
          <StepBrandKit
            logoUrl={formData.logoUrl}
            brandColor={formData.brandColor}
            businessName={formData.businessName}
            onLogoChange={handleLogoChange}
            onBrandColorChange={(color) => updateFormData("brandColor", color)}
          />
        );
      case "businessModel":
        return (
          <StepBusinessModel
            businessType={formData.businessType}
            targetHourlyRate={formData.targetHourlyRate}
            onBusinessTypeChange={(type) =>
              updateFormData("businessType", type)
            }
            onHourlyRateChange={(rate) =>
              updateFormData("targetHourlyRate", rate)
            }
          />
        );
      case "revenueGoal":
        return (
          <StepRevenueGoal
            monthlyRevenueGoal={formData.monthlyRevenueGoal}
            currency={formData.currency}
            onGoalChange={(goal) => updateFormData("monthlyRevenueGoal", goal)}
          />
        );
      case "income":
        return (
          <StepIncome
            monthlySalary={formData.monthlySalary}
            currency={formData.currency}
            onSalaryChange={(salary) => updateFormData("monthlySalary", salary)}
          />
        );
      case "savingsGoal":
        return (
          <StepSavingsGoal
            monthlySavingsGoal={formData.monthlySavingsGoal}
            monthlySalary={formData.monthlySalary}
            currency={formData.currency}
            onGoalChange={(goal) => updateFormData("monthlySavingsGoal", goal)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header with progress */}
      <header className="p-6">
        <div className="max-w-2xl mx-auto">
          <ProgressBar
            currentStep={currentStepIndex + 1}
            totalSteps={totalSteps}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer with navigation */}
      <footer className="p-6">
        <div className="max-w-2xl mx-auto flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="px-6 py-3 text-[var(--foreground)]/70 hover:text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <motion.button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className="px-8 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--background)] font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
          >
            {isLoading
              ? "Saving..."
              : currentStepIndex === totalSteps - 1
              ? "Complete"
              : "Continue"}
          </motion.button>
        </div>
      </footer>

      {/* Bridge teaser for "both" mode */}
      {formData.appMode === "both" && currentStepIndex === totalSteps - 1 && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--primary)]/20 border border-[var(--primary)]/30 rounded-full text-sm text-[var(--primary)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Soon we&apos;ll tell you when to Pay Yourself.
        </motion.div>
      )}
    </div>
  );
}
