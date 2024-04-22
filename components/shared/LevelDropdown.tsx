// import React from 'react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { ILevel } from '@/lib/database/models/level.model';
// import { useState } from 'react';

// type LevelDropdownProps = {
//   value?: string;
//   onChangeHandler?: () => void;
// };

// const LevelDropdown = ({ value, onChangeHandler }: LevelDropdownProps) => {
//   const [level, setLevel] = useState<ILevel[]>([
//     { _id: '1', name: 'Bronze' },
//     { _id: '2', name: 'Silver' },
//     { _id: '3', name: 'Advanced' },
//   ]);

//   return (
//     <Select onValueChange={onChangeHandler} defaultValue={value}>
//       <SelectTrigger className='select-field'>
//         <SelectValue placeholder='Level' />
//       </SelectTrigger>
//       <SelectContent>
//         {level.map((level) => (
//           <SelectItem
//             key={level._id}
//             value={level._id}
//             className='select-item p-regular-14'
//           >
//             {level.name}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };

// export default LevelDropdown;
