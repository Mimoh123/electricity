import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { axiosInstance } from '@/pages/auth/config';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import { IoIosPrint } from 'react-icons/io';

function DialogueComponent({
  qr,
  handleQrDiv,
  variant,
  deleteId,
  handleDiv,
  selectedItemEmail,
  handleSuccessDiv,
}) {
  const qrRef = useRef(null);
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/customer/${deleteId}`);
      handleDiv(false);

      toast.success('Successfully deleted Customer', {
        description: 'Successfully deleted the selected customer',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast(error.data.message);
    }
  };
  const resetPassword = async () => {
    try {
      const response = await axiosInstance.post(`/employee/reset`, {
        emailOrPhone: selectedItemEmail,
      });
      if (
        response.data.data.message ===
        "Password reset successful and sent to employee's email."
      ) {
        toast.success('Successfully reset Password', {
          description: 'Password reset successfully',
        });
        handleSuccessDiv(true);
      }
    } catch (error) {
      toast.error('Failed to Reset password ', {
        description: 'Failed to Reset Password',
      });
    }
  };
  const handlePrint = () => {
    if (qrRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              @media print {
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                }
                img {
                  max-width: 100%;
                }
              }
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
            </style>
          </head>
          <body>
            ${qrRef.current.outerHTML}
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
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
        <DialogContent className='pt-8  pb-16'>
          <DialogTitle />
          <div className='flex items-center justify-center h-96 w-92'>
            {qr ? (
              <div className='flex flex-col items-center justify-center space-y-5'>
                <section className='flex flex-col items-center'>
                  <h1 className='text-xl font-semibold'>Scan QR Code</h1>
                  <h1 className='text-gray-500 mt-2 text-base font-medium'>
                    Scan this qr to get the customer details
                  </h1>
                </section>

                <div
                  className='border-2 border-#CCCC rounded-lg p-3'
                  ref={qrRef}
                >
                  <QRCode
                    value={JSON.stringify({ meterNumber: qr })}
                    // height={80}
                    // width={80}
                    size={245}
                    className='rounded-lg'
                  />
                </div>
                <button
                  className='p-2  flex items-center w-full justify-center bg-blue-800 text-white rounded-lg px-5'
                  onClick={handlePrint}
                >
                  <IoIosPrint />
                  <h1 className='ml-2'> Print</h1>
                </button>
              </div>
            ) : (
              <p>No QR code data available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogueComponent;
