import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Keep a local shape for reference if needed, but avoid name clash with global Group
// interface DropdownGroup {
//   id: string | number;
//   name: string;
// }

interface Props {
  groups: Group[];
}

export default function DropDownMenu({ groups }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);
  const open = Boolean(anchorEl);

  console.log(selectedGroup, "selectedGroup");
  
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Selected group:', event.currentTarget.textContent);

    setAnchorEl(null);
    const selectedGroupName = event.currentTarget.textContent;
    setSelectedGroup(selectedGroupName )
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectedGroup ? selectedGroup : 'Выберите группу'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {groups.map((group) => (
          <MenuItem key={group.id} onClick={handleClose} >
            {group.name}  {/* Render only the name */}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}