export const quickExample = `<script lang="ts">
 import { useInfiniteScroll } from 'svelora';

 const loadMore = () => {
  console.log('load more');
 };
</script>

<div use:useInfiniteScroll={{ onLoadMore: loadMore }}>
 Scroll to load more
</div>`
