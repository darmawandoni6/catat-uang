import { useState } from 'react';

import { ArrowLeft, Ellipsis, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ModalDialog from '@component/pop-up/alert';
import { Button } from '@component/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@component/ui/dropdown-menu';
import DialogFormBucket from '@page/home/_components/form-bucket';
import type { BucketAPI } from '@page/home/types';
import { toastError, toastSuccess } from '@util/toast';

import { useSetStateGlobal, useStateGlobal } from '../hooks/use-context';
import { removeBucket } from '../repository/api';

const HeaderBucket = () => {
  const navigate = useNavigate();
  const { bucket } = useStateGlobal();
  const setState = useSetStateGlobal();

  const [openBucket, setOpenBucket] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);

  const handleBucket = () => {
    setOpenBucket(prev => !prev);
  };

  const handleRemove = () => {
    setRemove(prev => !prev);
  };
  const handleReset = async () => {
    try {
      await removeBucket(bucket.id);
      toastSuccess('Success remove bucket');
      navigate(-1);
    } catch (error) {
      toastError(error);
    }
  };

  const handleRefresh = (data: BucketAPI) => {
    setState(prev => ({ ...prev, bucket: data }));
  };

  return (
    <header className="flex items-center justify-between py-4 max-sm:py-2">
      <section className="flex flex-1 items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-10 text-gray-400 max-sm:size-9" />
        </Button>
        <h1 className="font-bold text-gray-900 capitalize max-sm:text-sm">{bucket.name}</h1>
      </section>
      <div className="min-w-16 px-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="size-10 text-gray-400 max-sm:size-9" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem onClick={handleBucket}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemove}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogFormBucket open={openBucket} onOpenChange={handleBucket} data={bucket} onRefresh={handleRefresh} />
      <ModalDialog
        open={remove}
        onOpenChange={() => setRemove(false)}
        onReset={handleReset}
        icon={<LogOut className="m-auto mb-6 size-10 text-red-600" />}
        title="Remove Bucket"
        description="Kamu yakin remove bucket ini ?"
        footer={{
          no: 'Cancel',
          yes: 'Ya',
        }}
      />
    </header>
  );
};

export default HeaderBucket;
