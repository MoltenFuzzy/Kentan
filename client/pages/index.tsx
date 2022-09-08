import { Welcome } from '../components/Welcome/Welcome';
import { NavBar, NavBarProps } from '../components/NavBar/NavBar';

export default function HomePage() {
  const props: NavBarProps = {
    links: [
      { link: 'dddd', label: 'test' },
      { link: 'dsadsa', label: 'test1' },
      { link: 'dddaasdd', label: 'test2' },
      { link: 'dddaaasaadssdd', label: 'test3' },
    ],
  };
  return (
    <>
      {/* <Welcome /> */}
      <NavBar links={props.links} />
    </>
  );
}
