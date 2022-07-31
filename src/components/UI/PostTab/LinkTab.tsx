import { Tab } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkTabProps {
  label: string;
  href: string;
}

export default function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();
  return (
    <Tab
      component='a'
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        // TODO REFACTOR
        // eslint-disable-next-line react/destructuring-assignment
        navigate(props.href);
      }}
      {...props}
    />
  );
}
