import { useEffect, useState } from 'react';

import { Wallet } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { http } from '@util/network';

const Login = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [isLoading, setIsLoading] = useState(!!code);

  useEffect(() => {
    if (code) {
      http
        .post('/google-me', { code })
        .then(() => {
          window.location.href = '/';
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [code]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    window.location.href = '/api/request';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-pink-50 p-0">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500 p-2">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
              Money Tracker
            </h1>
          </div>
          <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm max-sm:shadow-none">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl font-semibold">Masuk</CardTitle>
            <CardDescription className="text-center">Pilih metode login yang Anda inginkan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="hover:fill-accent-foreground h-11 w-full border border-gray-300 bg-white fill-gray-700 text-gray-700 shadow-sm"
              variant="outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="mr-2 h-4 w-4">
                <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
              </svg>

              {isLoading ? 'Menghubungkan...' : 'Masuk dengan Google'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
