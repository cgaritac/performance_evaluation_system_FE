import { ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormTemplateProps<TInput extends FieldValues, TOutput extends FieldValues = TInput> {
  methods: UseFormReturn<TInput, unknown, TOutput>;
  onSubmit: (data: TOutput) => void;
  children: ReactNode;
  className?: string;
}

const FormTemplate = <TInput extends FieldValues, TOutput extends FieldValues = TInput>({ 
  methods, 
  onSubmit, 
  children, 
  className 
}: FormTemplateProps<TInput, TOutput>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

export default FormTemplate;