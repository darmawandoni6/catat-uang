import { type FC, useState } from 'react';

import { AlertTriangle, CircleUserRound, LogOut, RefreshCw } from 'lucide-react';

import { getGreeting } from '@component/layout/utils/time';
import ModalDialog from '@component/pop-up/alert';
import { Button } from '@component/ui/button';
import { toastError } from '@util/toast';

import { logout } from '../repository/api';
import type { InitialState } from '../types';

interface Props {
  me: InitialState['me'];
}
const HeaderMain: FC<Props> = ({ me }) => {
  const [open, setOpen] = useState<'reset' | 'logout' | ''>('');

  const removeTransaction = async () => {
    try {
      await removeTransaction();
      toastError('success reset');
      setOpen('');
    } catch (error) {
      toastError(error);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      toastError('success logout');
      setOpen('');
      window.location.href = '/login';
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 max-sm:p-2">
      <div className="flex items-center gap-2">
        <CircleUserRound className="size-10 text-gray-400 max-sm:size-9" />
        <section className="leading-normal">
          <h1 className="font-bold text-gray-900 capitalize max-sm:text-sm">{me.name}</h1>
          <p className="text-xs text-gray-400">{getGreeting()}</p>
        </section>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => setOpen('reset')}>
          <RefreshCw className="size-10" />
        </Button>
        <Button variant="ghost" onClick={() => setOpen('logout')}>
          <LogOut className="size-10" />
        </Button>
      </div>

      <ModalDialog
        open={open === 'reset'}
        onOpenChange={() => setOpen('')}
        onReset={removeTransaction}
        icon={<AlertTriangle className="m-auto mb-6 size-10 text-orange-300" />}
        title="Reset Transaksi"
        description="Kamu yakin menghapus semua transaksi ?"
        footer={{
          no: 'Cancel',
          yes: 'Delete',
        }}
      />
      <ModalDialog
        open={open === 'logout'}
        onOpenChange={() => setOpen('')}
        onReset={handleLogout}
        icon={<LogOut className="m-auto mb-6 size-10 text-red-600" />}
        title="Logout Aplikasi"
        description="Kamu yakin keluar dari aplikasi ?"
        footer={{
          no: 'Cancel',
          yes: 'Ya',
        }}
      />
    </header>
  );
};

export default HeaderMain;
