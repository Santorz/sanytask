import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useModalFuncs = () => {
  const router = useRouter();

  const openNewTaskModal = useCallback(() => {
    router.push('/dashboard#new');
  }, [router]);
  const openEditTaskModal = useCallback(() => {}, []);
  const openViewTaskModal = useCallback(
    (taskId: string) => {
      router.push(`/dashboard#view?taskId=${taskId}`);
    },
    [router]
  );

  return { openNewTaskModal, openViewTaskModal, openEditTaskModal };
};