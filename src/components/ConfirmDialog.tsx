import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={ open } onOpenChange={ onCancel }>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>{ title }</DialogTitle>
          { description && <DialogDescription>{ description }</DialogDescription> }
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={ onCancel }>
            Cancel
          </Button>
          <Button onClick={ onConfirm }>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
