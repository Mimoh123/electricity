import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { axiosInstance } from '@/pages/auth/config';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';

function DialogueComponent({
  qr,
  handleQrDiv,
  variant,
  deleteId,
  handleDiv,
  selectedItemEmail,
  handleSuccessDiv,
}) {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/customer/${deleteId}`);
      handleDiv(false);
      console.log(response);
      toast.success('Successfully deleted Customer', {
        description: 'Successfully deleted the selected customer',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  const resetPassword = async () => {
    try {
      const response = await axiosInstance.post(`/employee/reset`, {
        emailOrPhone: selectedItemEmail,
      });
      console.log(response);
      if (
        response.data.data.message ===
        "Password reset successful and sent to employee's email."
      ) {
        toast.success('Successfully reset Password', {
          description: 'Password reset successfully',
        });
        handleSuccessDiv(true);
      }
      // setIsDialogOpen(false);
      // setisAlertOpen(true);
    } catch (error) {
      console.log(error);
      toast.error('Failed to Reset password ', {
        description: 'Failed to Reset Password',
      });
    }
  };
  if (variant === 'delete') {
    return (
      <Dialog
        defaultOpen
        onOpenChange={() => {
          handleDiv(false);
        }}
      >
        <DialogContent className='flex items-center flex-col py-16'>
          <h1 className='font-bold text-2xl'>Are you sure?</h1>
          <h1>Are you sure you want to delete this Customer?</h1>
          <div className='w-full mt-5 flex items-center justify-center'>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  handleDiv(false);
                }}
                className='mr-5 w-1/2 hover:bg-white bg-white text-black'
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              className='w-1/2 hover:bg-blue-500 bg-blue-700 text-white'
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  if (variant === 'forget-password') {
    return (
      <Dialog
        defaultOpen
        onOpenChange={() => {
          handleDiv(false);
        }}
      >
        <DialogContent className='flex items-center flex-col py-16'>
          <h1 className='font-bold text-2xl'>Are you sure?</h1>
          <h1>Are you sure you want to Reset Password?</h1>
          <div className='w-full mt-5 flex items-center justify-center'>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  handleDiv(false);
                }}
                className='mr-5 w-1/2 bg-white hover:bg-white brightness-150 font-bold text-black'
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className='w-1/2 bg-blue-600 hover:bg-blue-600 hover:brightness-150'
                onClick={() => {
                  resetPassword();
                  handleDiv(false);
                }}
              >
                Reset Password
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  if (variant === 'success-forgetpw') {
    return (
      <Dialog
        defaultOpen
        onOpenChange={() => {
          handleSuccessDiv(false);
        }}
      >
        <DialogContent className='flex items-center flex-col py-16'>
          <h1 className=' text-lg'>
            Your new password has been sent to your email
          </h1>
          <h1 className='font-bold text-2xl'>{selectedItemEmail}</h1>
          <div className='w-full mt-5 flex items-center justify-center'>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  handleSuccessDiv(false);
                }}
                className='mr-5 w-1/2 bg-blue-700 hover:bg-blue-600 brightness-150 font-bold text-white'
              >
                Ok
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  if (variant === 'qr') {
    return (
      <Dialog
        defaultOpen
        onOpenChange={() => {
          handleQrDiv(false);
        }}
      >
        <DialogContent className='p-0'>
          <DialogTitle />
          <div className='flex items-center justify-center h-96 w-92'>
            {qr ? (
              <QRCode
                value={JSON.stringify({ meterNumber: qr })}
                height={80}
                width={80}
              />
            ) : (
              <p>No QR code data available</p>
            )}

            {/* <img src='' /> */}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogueComponent;
