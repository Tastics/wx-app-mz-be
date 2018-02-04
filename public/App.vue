<template>
    <div>
        <!-- Content Wrapper. Contains page content -->
        <div class="container">
            <router-view></router-view>
        </div>
        <!--<navbar></navbar>-->
    </div>
</template>

<script>
    const services = require('services');
    import navbar from '@/components/common/navbar'

    export default {
        name: 'app',
        components: {
            navbar
        }
    }
</script>