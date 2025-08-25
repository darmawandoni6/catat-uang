import type { ReactNode } from 'react';
import { type FC, useState } from 'react';

import { Button } from '@component/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@component/ui/dialog';

interface Props {
  open: boolean;
  title: string;
  description: ReactNode;
  footer: {
    no: string;
    yes: string;
  };
  icon?: ReactNode;
  onOpenChange: VoidFunction;
  onReset?: () => Promise<void>;
}
const ModalDialog: FC<Props> = ({ open, title, description, footer, icon, onOpenChange, onReset }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    if (loading) return;
    onOpenChange();
  };

  const handleConfirm = async () => {
    if (!onReset) return;
    setLoading(true);
    try {
      await onReset();
      handleCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}

            <div className="mt-4 flex justify-center gap-4">
              <Button variant="outline" className="border" onClick={handleCancel}>
                {footer.no}
              </Button>
              <Button variant="destructive" onClick={handleConfirm} loading={loading}>
                {footer.yes}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
