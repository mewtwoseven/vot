import type { ReactElement } from "react";
import Link from 'next/link';
import DropDownLink from "./DropDownLink";
import { Popover } from "@headlessui/react";
import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const NavMenu: React.FC = (): ReactElement => {

  const articles = [
    {
      name: 'Analytics',
      description: 'Get a better understanding of where your traffic is coming from.',
      href: '#',
      Icon: ChartBarIcon,
    },
    {
      name: 'Engagement',
      description: 'Speak directly to your customers in a more meaningful way.',
      href: '#',
      Icon: CursorArrowRaysIcon,
    },
    { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
    {
      name: 'Integrations',
      description: "Connect with third-party tools that you're already using.",
      href: '#',
      Icon: Squares2X2Icon,
    },
    {
      name: 'Automations',
      description: 'Build strategic funnels that will drive your customers to convert',
      href: '#',
      Icon: ArrowPathIcon,
    },
  ]
  const callsToAction = [
    { name: 'Watch Demo', href: '#', Icon: PlayIcon },
    { name: 'Contact Sales', href: '#', Icon: PhoneIcon },
  ]
  const resources = [
    {
      name: 'Help Center',
      description: 'Get all of your questions answered in our forums or contact support.',
      href: '#',
      Icon: LifebuoyIcon,
    },
    {
      name: 'Guides',
      description: 'Learn how to maximize our platform to get the most out of it.',
      href: '#',
      Icon: BookmarkSquareIcon,
    },
    {
      name: 'Events',
      description: 'See what meet-ups and other events we might be planning near you.',
      href: '#',
      Icon: CalendarIcon,
    },
    { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', Icon: ShieldCheckIcon },
  ]
  const recentPosts = [
    { id: 1, name: 'Boost your conversion rate', href: '#' },
    { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
    { id: 3, name: 'Improve your customer experience', href: '#' },
  ]

  return (
    <Popover.Group as="nav" className="hidden space-x-10 md:flex">
      <DropDownLink primaryLinks={articles} secondaryLinks={callsToAction} />

      <Link
        href="/results"
        className="rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-primary hover:text-gray-900"
      >
        Results
      </Link>
      <Link
        href="/about"
        className="rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-primary hover:text-gray-900"
      >
        About
      </Link>

      <DropDownLink primaryLinks={resources} secondaryLinks={recentPosts} />
    </Popover.Group>
  );
};

export default NavMenu;
