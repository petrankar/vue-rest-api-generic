
import { ref, onMounted } from 'vue';
import { useLoadingStore } from '../stores/loading';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

interface UseAsyncOptions<T> {
  autoRun?: boolean; // run on mount?
  storeSetter?: (data: T) => void; //  Pinia store setter
  globalLoading?: boolean; // control global spinner
  payload?: any; // request body for POST/PUT/PATCH
}

export function useAsyncRequest<T>(serviceFn: (payload?: any) => Promise<T>, options: UseAsyncOptions<T> = {}) {
  const { autoRun = false, storeSetter, globalLoading = true, payload } = options;

  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const loadingStore = useLoadingStore();

  const run = async (customPayload?: any) => {
    if (globalLoading) loadingStore.start();
    loading.value = true;
    error.value = null;

    try {
      const result = await serviceFn(customPayload ?? payload);
      data.value = result;
      if (storeSetter) storeSetter(result);
    } catch (err: any) {
      error.value = err.message || 'Request failed';
    } finally {
      loading.value = false;
      if (globalLoading) loadingStore.stop();
    }
  };

  if (autoRun) onMounted(() => run());

  return { data, loading, error, run };
}
