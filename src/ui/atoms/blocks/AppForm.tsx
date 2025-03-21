'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validation?: object;
}

interface AppFormProps<T extends FieldValues> {
  children?: React.ReactNode;
  onSubmit?: SubmitHandler<T>;
  method?: string;
  fields: Field[];
  inputVals?: any
}

export default function AppForm<T extends FieldValues>({ children, method = 'post', onSubmit = () => {}, fields, inputVals, ...rest }: AppFormProps<T>) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<T>();

  useEffect(() => {
    if(inputVals) {
      for(const fname in inputVals) {
        setValue(fname as Path<T>, inputVals[fname])
      }
    }
  }, [inputVals])

  return (
    <Card className="md:w-2/3 mx-auto mt-10 p-6 shadow-lg w-11/12">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                {...register(field.name as Path<T>, field.validation)}
              />
              {errors[field.name] && <p className="text-red-500 text-sm">{String(errors[field.name]?.message)}</p>}
            </div>
          ))}
          <div className="flex justify-center">
          <Button type="submit" className="w-2/3 text-white font-bold hover:bg-primary-hover">حفظ البيانات</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}