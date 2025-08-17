import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  groups: Group[];
  selectedGroup: string | null;
  setSelectedGroup: (name: string) => void;
  setGroupId: (id: number | undefined) => void;
}

export default function DropDownMenu({ groups, selectedGroup, setSelectedGroup, setGroupId }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, id: number | undefined, name: string) => {
    setSelectedGroup(name);
    setGroupId(id);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        onClose={handleMenuClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {groups.map((group) => (
          <MenuItem
            key={group.id}
            onClick={(e) => handleMenuItemClick(e, group.id, group.name)}
          >
            {group.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}