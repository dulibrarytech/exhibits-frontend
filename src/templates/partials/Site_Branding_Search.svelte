<script>
    import Site_Branding from './Site_Branding.svelte';
    import Search_Box from '../../components/Search_Box.svelte';

    export let data = {};

    let {
        endpoint,
        queryParam,
        params,
        fields,
        buttonText,
        placeholder

    } = data;
</script>

<div class="site-branding-search-banner">
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-8">
                    <Site_Branding />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <Search_Box {endpoint} {queryParam} {params} {fields} {buttonText} {placeholder} />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .site-branding-search-banner {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e5e3e1;
        padding-bottom: 10px;
    }

    .row>* {
        padding-right: 0;
        padding-left: 0;
    }

    :global(.site-branding-search-banner .site-branding.container) {
        padding-right: 0;
        padding-left: 0;
    }

    :global(.site-branding-search-banner .site-branding-banner) {
        border-bottom-style: none !important;
    }

    @media screen and (min-width: 768px) {
        .site-branding-search-banner {
            padding-bottom: 0px;
        }
    }
</style>