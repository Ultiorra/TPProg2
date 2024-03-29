"use client";
import CartCounter from "../components/cartCounter";
import { FC, memo, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuBar, Button } from "tp-kit/components";
import { ShoppingBag, X,Person} from "@phosphor-icons/react";
import  Cart  from "../components/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Props = {};

const Menu: FC<Props> = memo(function () {
  const router = useRouter();
  return (
  
    <MenuBar
      trailing={
        <Popover as="div" className="flex justify-end">
          {({ open }) => (
            <>
            <Button  variant={"ghost"} className={"!rounded-full !p-0 flex justify-center items-center aspect-square relative text-3xl"} onClick={() => router.push("/mon-compte")}>
                {<Person size={24} weight="regular" />}

               
              </Button>
              <Popover.Button as={Button} variant={"ghost"} className={"!rounded-full !p-0 flex justify-center items-center aspect-square relative text-3xl"}>
                {open 
                  ? <X size={18} weight="regular" />
                  : <ShoppingBag size={24} weight="regular" />}

                <div className="aspect-square bg-brand text-white text-center text-xs absolute right-0 top-0 rounded-full flex items-center justify-center h-[20px] w-[20px]">
                  <CartCounter />
                </div>
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
                <Popover.Panel className="absolute left-0 sm:left-auto right-0 top-full z-10 mt-6 sm:w-full sm:max-w-sm">
                  <Cart />
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      }
    />
  );
});

Menu.displayName = "Menu";
export { Menu };
