import { Box, Tabs } from '@mui/material';
import LinkTab from 'components/UI/PostTab/LinkTab';
import TabPanel from 'components/UI/PostTab/TabPanel';
import React, { ReactElement, useEffect } from 'react';

export type PostTabTitleProps = {
  value: string;
  href: string;
};

interface PostTabProps {
  children: ReactElement[];
  titles: PostTabTitleProps[];
  defaultActiveTab?: number;
}

const PostTab: React.FC<PostTabProps> = ({children, titles, defaultActiveTab = 0}) => {
  const [value, setValue] = React.useState(defaultActiveTab);

  useEffect(() => {
    setValue(defaultActiveTab);
  }, [defaultActiveTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (Array.isArray(children) && children.length !== titles.length) {
      throw new Error('Post Tab Error: children count must be equal titles count !');
    }
  }, []);

  function renderTabContent() {
    if (Array.isArray(children)) {
      return children.map((component, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TabPanel index={index} value={value} key={index}>
          {component}
        </TabPanel>
      ));
    }

    return children;
  }

  function renderTabHeader() {
    return titles.map((item) => (
      <LinkTab label={item.value} href={item.href} key={item.href}/>
    ));
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange}>
          {renderTabHeader()}
        </Tabs>
      </Box>
      {renderTabContent()}
    </>
  );
};

export default PostTab;
