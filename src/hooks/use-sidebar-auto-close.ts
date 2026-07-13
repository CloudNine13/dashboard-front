import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

export default function useSidebarAutoClose() {
  const pathname = usePathname();
  const { setOpen, setOpenMobile } = useSidebar();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      setOpen(false);
      setOpenMobile(false);
      previousPathnameRef.current = pathname;
    }
  }, [pathname, setOpen, setOpenMobile]);
}
