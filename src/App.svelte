<script>
    import './js/sw';
    import BannerUpdate from './components/BannerUpdate.svelte';
    import Router from './Router.svelte';

    ! window.location.hash && window.location.replace(`${window.location.origin}/#${window.location.pathname}`);
</script>

<BannerUpdate />
<Router />
