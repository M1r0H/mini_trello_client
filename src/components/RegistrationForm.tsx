import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth.tsx';
import type { JSX } from 'react';
import type { AuthRegistrationFormData } from '@/types/types';

const registerSchema = z.object({
  email: z.string().email(),
});

export const RegistrationForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { registration, status } = useAuth();

  const form = useForm<AuthRegistrationFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: AuthRegistrationFormData) => {
    await registration(data);
    form.reset();
    navigate('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="auth-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === 'loading'} className="auth-submit">
          {status === 'loading' ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
};
