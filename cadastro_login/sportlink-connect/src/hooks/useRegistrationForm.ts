import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, formData: any) => string | null;
}

interface FieldConfig {
  [key: string]: ValidationRule;
}

export function useRegistrationForm<T extends Record<string, any>>(
  initialData: T,
  validationRules: FieldConfig
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (field: keyof T, value: any): string | null => {
      const rules = validationRules[field as string];
      if (!rules) return null;

      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        return 'Este campo é obrigatório';
      }

      if (typeof value === 'string') {
        if (rules.minLength && value.length < rules.minLength) {
          return `Mínimo de ${rules.minLength} caracteres`;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
          return `Máximo de ${rules.maxLength} caracteres`;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
          if (field === 'email') return 'E-mail inválido';
          if (field === 'telefone') return 'Telefone inválido';
          return 'Formato inválido';
        }
      }

      if (rules.custom) {
        return rules.custom(value, formData);
      }

      return null;
    },
    [formData, validationRules]
  );

  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      
      // Validate on change if field was touched
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
      }
    },
    [touched, validateField]
  );

  const setFieldTouched = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, formData[field]);
      setErrors((prev) => ({ ...prev, [field]: error || undefined }));
    },
    [formData, validateField]
  );

  const validateForm = useCallback(
    (fields?: (keyof T)[]): boolean => {
      const fieldsToValidate = fields || (Object.keys(validationRules) as (keyof T)[]);
      const newErrors: Partial<Record<keyof T, string>> = {};
      let isValid = true;

      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));
      setTouched((prev) => {
        const newTouched = { ...prev };
        fieldsToValidate.forEach((field) => {
          newTouched[field] = true;
        });
        return newTouched;
      });

      return isValid;
    },
    [formData, validateField, validationRules]
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    formData,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateForm,
    resetForm,
    setFormData,
  };
}

export default useRegistrationForm;
