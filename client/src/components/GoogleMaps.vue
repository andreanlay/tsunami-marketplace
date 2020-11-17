<template>
<div id="map">

</div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            marker: null,
        }
    },
    methods: {
        init() {
            const google = window.google

            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -1.793494, lng: 119.097142},
                zoom: 4,
                mapTypeControl: true,
                fullscreenControl: true,
            })

            this.marker = new google.maps.Marker({
                position: {lat: 0, lng: 0},
                map: this.map,
                label: {
                    text: '🏠',
                    color: "#FFF"
                },
            })

            google.maps.event.addListener(this.map, 'click', (e) => {
                this.marker.setPosition(e.latLng)
                this.$emit('mapClick', {
                    lat: this.marker.getPosition().lat(),
                    lng: this.marker.getPosition().lng()
                })
            })
        },
        addMarker(coordinates) {
            const google = window.google

            return new google.maps.Marker({
                position: coordinates,
                map: this.map,
                label: {
                    text: '🏠',
                    color: "#FFF"
                }
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>
#map {
    position: relative !important;
    width: 100%;
    height: 400px;
}
</style>