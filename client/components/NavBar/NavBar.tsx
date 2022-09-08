import { useState } from 'react';
import { Header, Autocomplete, Container, Group, Burger, Text, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import useStyles from './NavBar.styles';

export interface NavBarProps {
  links: { link: string; label: string }[];
}

export function NavBar({ links }: NavBarProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={70} mb={120}>
      <Container size="xl" className={classes.header}>
        <Text size={30}>EatDeez</Text>
        <Autocomplete
          size="md"
          className={classes.search}
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={[]} // put cached search history here
        />
        <Group spacing={10} className={classes.links}>
          {items}
        </Group>
        <Box className={classes.toggle}>
          <ColorSchemeToggle />
        </Box>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
}
