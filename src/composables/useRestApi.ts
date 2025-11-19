
import { ref, onMounted } from 'vue';
import { useLoadingStore } from '../stores/loading';
import { getRequest, postRequest, putRequest, patchRequest } from '../api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

interface UseAsyncOptions<T> {
  autoRun?: boolean; // run on mount?
  storeSetter?: (data: T) => void; //  Pinia store setter
  globalLoading?: boolean; // control global spinner
  method: HttpMethod; // HTTP method to use
  path: string; // API endpoint path
}

export function useAsyncRequest<T>(options: UseAsyncOptions<T>) {
  const { autoRun = false, storeSetter, globalLoading = true, method, path } = options;

  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const loadingStore = useLoadingStore();

  const run = async (payload?: any) => {
    if (globalLoading) loadingStore.start();
    loading.value = true;
    error.value = null;

    try {
      let result: T;
      
      switch (method) {
        case 'GET':
          result = await getRequest<T>(path);
          break;
        case 'POST':
          result = await postRequest<T>(path, payload);
          break;
        case 'PUT':
          result = await putRequest<T>(path, payload);
          break;
        case 'PATCH':
          result = await patchRequest<T>(path, payload);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      
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
