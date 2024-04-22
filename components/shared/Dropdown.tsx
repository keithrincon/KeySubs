import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ICategory } from '@/lib/database/models/category.model';
import { startTransition, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '../ui/input';
import {
  createCategory,
  getAllCategories,
} from '@/lib/actions/category.actions';

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [sports, setSports] = useState<ICategory[]>([]);

  const [newSport, setNewSport] = useState('');

  const handleAddSport = () => {
    createCategory({
      categoryName: newSport.trim(),
    }).then((category) => {
      setSports((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const sportList = await getAllCategories();

      sportList && setSports(sportList as ICategory[]);
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className='select-field'>
        <SelectValue placeholder='Sport' />
      </SelectTrigger>
      <SelectContent>
        {sports.length > 0 &&
          sports.map((sport) => (
            <SelectItem
              key={sport._id}
              value={sport._id}
              className='select-item p-regular-14'
            >
              {sport.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>
            Add New Sport
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white'>
            <AlertDialogHeader>
              <AlertDialogTitle>New Sport</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type='text'
                  placeholder='What sport type do you want to add?'
                  className='input-field mt-3'
                  onChange={(e) => setNewSport(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddSport)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
