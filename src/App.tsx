import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRecoilValue, useRecoilState } from 'recoil';
import { todoListState } from '@app/recoil/todo-state';
import Header from './components/Header';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function App() {
  const [text, setText] = useRecoilState(todoListState);
  return (
    <div>
      <Header />
      <div className="p-2 md:p-5">Hello world!</div>;
    </div>
  );
}
