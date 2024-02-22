import React from "react";

const DetailedInfo = () => {
  return (
    <div className="container my-5 col-md-10">
      <h2 className="text-center">Yol Bozukluklarını Bildirme
</h2>
      <p>Uygulamamızı daha etkili hale getirmek için sizin geri bildiriminize ihtiyacımız var! Eğer gördüğünüz bir yol bozukluğunu bildirmek isterseniz, lütfen aşağıdaki adımları izleyin:</p>
      <ol>
      <li>
          <strong>Kayıt Olun:</strong> Uygulamamızı kullanmak için bir hesap oluşturun.
        </li>
        <li>
          <strong>Fotoğraf Çekin:</strong> Yol bozukluğunun bir fotoğrafını çekin. Fotoğraf, sorunu daha iyi anlamamıza ve çözüm için gereken adımları atmamıza yardımcı olacaktır.
        </li>
        <li>
          <strong>Adresi Belirleyin:</strong> Yol bozukluğunun bulunduğu adresi belirleyin veya en yakın sokak ismi veya kavşak gibi referans noktalarını sağlayın.
        </li>
        <li>
          <strong>Uygulamaya Ekleyin:</strong> Uygulamamızın "Tespit Ekle" bölümünden, fotoğrafı ve adres bilgisini ekleyerek yol bozukluğunu bize bildirin.
        </li>
        <li>
          <strong>Bekleyin:</strong> Bildiriminiz alındıktan sonra, ekibimiz sorunu çözmek için gereken adımları atacaktır. Bildiriminizin işlenmesi biraz zaman alabilir, lütfen sabırlı olun.
        </li>
      </ol>
      <p>Yaptığınız geri bildirimler, uygulamamızı daha kullanışlı ve güvenli hale getirmemize yardımcı olacaktır. Teşekkür ederiz!</p>
    </div>
  );
};

export default DetailedInfo;
