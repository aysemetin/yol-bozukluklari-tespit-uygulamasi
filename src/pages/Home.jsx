import React from "react";

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img
            src="https://fotograf.bursa.com.tr/galeri/2013/12/1.png"
            alt="Logo"
            className="img-fluid"
            style={{ height: "400px" }}
          />
        </div>

        <div className="col-md-8 my-5">
          <h2 className="text-center">Yol Bozuklukları Tespit Uygulaması</h2>
          <p>
            Hoş geldiniz! Yol Bozuklukları Tespit Uygulaması, şehirlerimizin
            ulaşım altyapısını daha güvenli ve konforlu hale getirmek için
            tasarlanmıştır. Akıllı Şehircilik ilkelerine dayanan bu uygulama,
            vatandaşların yol bozukluklarını kolayca tespit etmelerini ve
            yetkililere bildirmelerini sağlar.
          </p>
          <p>
            Uygulamamızın temel amacı, şehirdeki yol bozukluklarını hızlı bir
            şekilde belirleyerek onarımların yapılmasını sağlamaktır. Bu sayede
            sürücülerin ve yayaların güvenliği artar, araçların hasar görmesi
            engellenir ve şehir yaşam kalitesi yükselir.
          </p>
          <p>
            Yol Bozuklukları Tespit Uygulaması'nı kullanmak çok kolay.
            Uygulamaya giriş yaptıktan sonra, çevrenizdeki yol bozukluklarını
            fotoğraflayarak ve kısa bir açıklama ekleyerek yetkililere
            iletebilirsiniz. Bildiriminiz en kısa sürede ilgili birimlere
            iletilir ve gerekli önlemler alınarak sorunun çözülmesi sağlanır.
          </p>
          <p>
            Akıllı Şehircilik için adım atmak ve şehrinizin daha güvenli, daha
            konforlu bir yer olmasına katkıda bulunmak için Yol Bozuklukları
            Tespit Uygulaması'nı hemen kullanmaya başlayın!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
