<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Pengaduan</b></p>
              <p class="card-description float-right">
                <b-button
                  variant="success"
                  v-b-modal.modalMasyarakat
                  v-on:click="Add"
                  ><i class="mdi mdi-plus btn-icon-prepend"></i> Add
                  Pengaduan</b-button
                >
              </p>
              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <template v-slot:cell(status)="data">
                    <b-badge variant="info" style="text-transform: uppercase">{{
                      data.item.status
                    }}</b-badge>
                  </template>
                  <template v-slot:cell(kategori)="data">
                    <b-badge
                      variant="warning"
                      style="text-transform: uppercase"
                      >{{ data.item.kategori.nama_kategori }}</b-badge
                    >
                  </template>
                  <template v-slot:cell(tanggal)="data">
                    {{ data.item.tgl_pengaduan | format }}
                  </template>
                  <template v-slot:cell(laporan)="data">
                    {{ data.item.isi_laporan | format }}
                  </template>
                  <template v-slot:cell(tanggapan)="data">
                    {{
                      data.item.tanggapan !== null
                        ? data.item.tanggapan.tanggapan
                        : null
                    }}
                  </template>
                  <template v-slot:cell(foto)="data">
                    <img
                      style="width: 200px; height: 100px; border-radius: 5%"
                      :src="'http://localhost:8000/uploads/' + data.item.foto"
                    />
                  </template>
                  <template v-slot:cell(action)="data">
                    <b-button
                      variant="success"
                      v-b-modal.modalMasyarakat
                      v-on:click="Edit(data.item)"
                      ><i class="mdi mdi-plus btn-icon-prepend"></i> 
                      Pengaduan</b-button
                    >
                  </template>
                </b-table>

                <b-modal id="modalMasyarakat" @ok="Save">
                  <template v-slot:modal-title> Form Masyarakat</template>
                  <form ref="form">
                    <div class="form-group">
                      <label for="tgl_pengaduan" class="col-form-label"
                        >Tanggal Pengaduan</label
                      >
                      <input
                        type="date"
                        name="tgl_pengaduan"
                        class="form-control"
                        id="tgl_pengaduan"
                        placeholder="tgl pengaduan"
                        v-model="tgl_pengaduan"
                      />
                    </div>
                    <div class="form-group">
                      <label for="isi_laporan" class="col-form-label"
                        >Laporan</label
                      >
                      <textarea
                        class="form-control"
                        name="isi_laporan"
                        id="isi_laporan"
                        v-model="isi_laporan"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="foto" class="col-form-label">File</label>
                      <input
                        type="file"
                        name="foto"
                        class="form-control"
                        id="foto"
                        placeholder="upload"
                      />
                    </div>
                    <div class="form-group">
                      <label for="id_kategori" class="col-form-label"
                        >Kategori</label
                      >
                      <select
                        class="form-control"
                        name="id_kategori"
                        id="id_kategori"
                        v-model="id_kategori"
                      >
                        <option value="" disabled selected>
                          Pilih Kategori
                        </option>
                        <option
                          :value="kategori.id_kategori"
                          v-for="(kategori, index) in kategori"
                          :key="index"
                        >
                          {{ kategori.nama_kategori }}
                        </option>
                      </select>
                    </div>
                  </form>
                </b-modal>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination"
                >
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="secondary"></b-spinner>
                  <strong class="text-secondary"> Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    return {
      search: "",
      id_pengaduan: "",
      id_user: "",
      nama: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      foto: "",
      status: "",
      tanggapan: "",
      id_kategori: "",
      action: "",
      message: "",
      pagination: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      user: [],
      pengaduan: [],
      kategori: [],
      fields: [
        "tanggal",
        "laporan",
        "kategori",
        "status",
        "foto",
        "tanggapan",
      ],
    };
  },

  methods: {
    getData: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
        .then((response) => {
          if (response.data.success) {
            this.$bvToast.hide("loadingToast");
            this.pengaduan = response.data.data.pengaduan;
            this.tanggapan = response.data.data.pengaduan.tanggapan;
            this.rows = response.data.data.count;
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan data Pengaduan.";
            this.$bvToast.show("message");
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    Add: function () {
      this.action = "insert";
      this.getKategori();
      this.id_pengaduan = "";
      this.tgl_pengaduan = "";
      this.isi_laporan = "";
      this.id_kategori = "";
      this.foto = "";
      document.getElementById("foto").value = null;
    },

    // Edit: function (item) {
    //   this.action = "update";
    //   this.id_pengaduan = item.id_pengaduan;
    //   this.tgl_pengaduan = item.tgl_pengaduan;
    //   this.status = item.status;
    //   this.tanggapan = item.tanggapan;
    // },

    Save: function () {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.$bvToast.show("loadingToast");
      this.action === "insert";
      let form = new FormData();
      form.append("id_pengaduan", this.id_pengaduan);
      form.append("tgl_pengaduan", this.tgl_pengaduan);
      form.append("isi_laporan", this.isi_laporan);
      form.append("foto", document.getElementById("foto").files[0]);
      form.append("id_kategori", this.id_kategori);

      this.axios
        .post("/masyarakat/pengaduan", form, conf)
        .then((response) => {
          this.$bvToast.hide("loadingToast");
          this.message = response.data.message;
          this.$bvToast.show("message");
          this.getData();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    getKategori() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.axios.get("kategori", conf).then((response) => {
        console.log(response);
        this.kategori = response.data.data.kategori;
      });
    },
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getData();
  },
};
</script>