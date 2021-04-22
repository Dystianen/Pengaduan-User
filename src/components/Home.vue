<template>
  <section id="hero" class="d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center"
        >
          <h1>Selamat Datang di Website Pengaduan Masyarakat</h1>
          <h2>
            Kami siap melayani & membantu anda untuk melakukan pengaduan atas
            keluhan yang anda alami dikehidupan bermasyarakat
          </h2>
          <div>
            <router-link to="/input" class="btn btn-primary">
              <i class="mdi mdi-view-dashboard-outline menu-icon"></i>
              <span class="menu-title">Pengaduan</span>
            </router-link>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img">
          <img src="../../public/img/hero-img.png" class="img-fluid" alt="" />
        </div>
      </div>
      
      <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
        <b-spinner label="Spinning" variant="secondary"></b-spinner>
        <strong class="text-secondary"> Loading...</strong>
      </b-toast>

      <!-- toast untuk tampilan message box -->
      <b-toast id="message" title="Message">
        <strong class="text-success">{{ message }}</strong>
      </b-toast>
    </div>
  </section>
  <!-- End Hero -->
</template>

<script>
export default {
  methods: {
    name: "home",
  },
};
</script>
