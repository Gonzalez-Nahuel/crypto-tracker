import { useAppDispatch } from "@/redux/hooks";
import { fetchMe } from "@/redux/slices/session-slice";
import { useEffect } from "react";

export const AuthBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return null;
};
