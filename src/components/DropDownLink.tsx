import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import type { ReactElement, SVGProps } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface ListLinkProps {
  name: string;
  description?: string;
  href: string;
  Icon?: (props: SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }) => JSX.Element;
}

interface DDLProps {
  primaryLinks: Array<ListLinkProps>;
  secondaryLinks: Array<ListLinkProps>;
}

const DropDownLink: React.FC<DDLProps> = ({ primaryLinks, secondaryLinks }): ReactElement => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? "text-gray-900" : "text-gray-600",
              "group inline-flex items-center rounded-md bg-secondary text-base font-medium hover:bg-primary hover:text-gray-900 focus:bg-primary focus:text-gray-900 focus:shadow focus:outline-none"
            )}
          >
            <span className="px-3 py-2">Articles</span>
            <ChevronDownIcon
              className={classNames(
                open ? "text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 group-hover:text-gray-600"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-secondary px-5 py-6 sm:gap-8 sm:p-8">
                  {primaryLinks.map(({name, href, Icon, description }) => (
                    <Link
                      key={name}
                      href={href}
                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-tertiary"
                    >
                      <Icon
                        className="h-6 w-6 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">
                          {name}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="space-y-6 bg-tertiary px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  {secondaryLinks.map(({name, href, Icon}) => (
                    <div key={name} className="flow-root">
                      <Link
                        href={href}
                        className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-tertiary"
                      >
                        <Icon
                          className="h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">{name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DropDownLink;

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}
