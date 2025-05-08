import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function AddColumnButton({ onCreate }: { onCreate: (title: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title.trim());
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[200px] h-[56px] border-dashed text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Column
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <h2 className="text-lg font-semibold">Create New Column</h2>
        <Input
          placeholder="Column title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="mt-4 w-full" onClick={handleCreate}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
