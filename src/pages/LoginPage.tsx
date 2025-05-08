import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/LoginForm';
import { RegistrationForm } from '@/components/RegistrationForm';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[var(--background)] text-[var(--text-main)]">
      <div className="hidden md:flex items-center justify-center bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
        <div className="text-center px-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Mini-Trello</h1>
          <p className="text-lg opacity-80">Your simple and effective task manager.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md p-8 shadow-xl bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="auth-tabs mb-6">
              <TabsTrigger value="login" className="auth-tab">Login</TabsTrigger>
              <TabsTrigger value="register" className="auth-tab">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              <RegistrationForm />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
