package com.positive.culture.seoulQuest.seoulQuest.repository;

import com.positive.culture.seoulQuest.domain.Category;
import com.positive.culture.seoulQuest.domain.Product;
import com.positive.culture.seoulQuest.repository.CategoryRepository;
import com.positive.culture.seoulQuest.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import javax.swing.plaf.PanelUI;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.IntStream;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    //3. product data 추가

    @Test
    public void testInsertSeoulProducts() {
        // Product details for each category
        String[][] productDetails = {
                {
                        "Flawless Seoul BB Cream|Achieve a flawless complexion with our lightweight BB cream, inspired by Seoul's beauty trends.",
                        "Bamboo Sheet Mask Set|Embrace sustainable living with our bamboo sheet mask set, made with ingredients from Jeju Island.",
                        "Green Tea Facial Mist|Refresh your skin with our hydrating facial mist infused with Korean green tea extract.",
                        "Vitamin C Glow Serum|Brighten your complexion with our vitamin C serum, crafted in Seoul's beauty labs.",
                        "Volcanic Clay Pore Mask|Deep cleanse your pores with our volcanic clay mask sourced from Korean hot springs.",
                        "Aloe Vera Moisture Gel|Moisturize your skin with our aloe vera gel from Korea's organic farms.",
                        "SPF50 Seoul Sunblock|Protect your skin with our SPF50 sunblock, a must-have for exploring Seoul’s sunny streets.",
                        "Ginseng Sheet Mask Pack|Pamper yourself with our luxurious ginseng sheet masks, a Korean skincare staple.",
                        "Camellia Hair Oil|Revitalize your hair with our camellia oil, inspired by traditional Korean haircare.",
                        "Rice Bran Body Scrub|Exfoliate gently with our rice bran body scrub, a centuries-old Korean beauty secret.",
                        "Smudge-Proof Seoul Mascara|Enhance your eyes with our smudge-proof mascara, perfect for all-day Seoul adventures.",
                        "Anti-Aging Essence|Get a youthful glow with our anti-aging essence, infused with hanbang (traditional Korean medicine).",
                        "Plum Tinted Lip Balm|Enjoy silky lips with our tinted lip balm, enriched with Korean plum extract.",
                        "Foaming Facial Cleanser|Cleanse effectively with our foaming facial cleanser, made with natural ingredients from Korea.",
                        "Tea Tree Spot Treatment|Treat acne with our targeted tea tree spot treatment, ideal for sensitive skin.",
                        "Brow Styling Gel|Achieve flawless brows with our brow styling gel, inspired by K-beauty trends."
                },
                {
                        "Seoul Roasted Barley Tea|Savor the smooth flavor of our Seoul-style roasted barley tea, a beloved Korean staple.",
                        "Organic Green Tea Blend|Stay energized with our organic green tea blend, handpicked from Korean tea plantations.",
                        "Jeju Tangerine Tea|Indulge in the floral notes of our Jeju Island tangerine tea.",
                        "Chrysanthemum Herbal Tea|Relax with our chrysanthemum tea, a traditional Korean herbal favorite.",
                        "Korean Citron Tea|Revitalize your senses with our Korean citron tea, perfect for chilly Seoul winters.",
                        "Ginger & Jujube Tea|Boost your immunity with our ginger and jujube tea, a classic Korean home remedy.",
                        "Corn Silk Tea|Enjoy the nutty aroma of our Korean corn silk tea, brewed for relaxation.",
                        "Mugwort Tea|Savor the earthy taste of our traditional Korean mugwort tea.",
                        "Mountain Ginseng Tea|Try the bold flavor of our ginseng tea, sourced from the mountains of Korea.",
                        "Iced Persimmon Tea Mix|Cool off with our iced persimmon tea mix, inspired by Seoul summers.",
                        "Burdock Root Detox Tea|Detoxify with our burdock root tea, a time-honored Korean herbal infusion.",
                        "Korean Breakfast Tea|Wake up with our traditional Korean breakfast tea, featuring roasted grains.",
                        "Fermented Black Tea|Explore rare flavors with our fermented Korean black tea.",
                        "Mint Infused Barley Tea|Support digestion with our mint-infused Korean barley tea.",
                        "Omija Five-Flavor Tea|Relieve stress with our omija (five-flavor berry) tea, grown in Korea's valleys.",
                        "Bamboo Leaf Tea|Rehydrate with our electrolyte-rich bamboo leaf tea."
                },
                {
                        "Hanbok Silk Scarf|Stay cozy with our hanbok-inspired silk scarf, handcrafted in Seoul.",
                        "Korean Knot Necklace|Complete your outfit with our traditional Korean knot necklace (maedeup).",
                        "Leather Crossbody Bag|Carry essentials stylishly with our leather crossbody bag, made in Seoul.",
                        "Platform Shoes|Walk comfortably in our Korean-style platform shoes, designed for modern fashionistas.",
                        "UV-Protective Sunglasses|Upgrade your look with our UV-protective Korean sunglasses.",
                        "Seoul Graphic Hoodie|Stay casual with our unisex Seoul graphic hoodie, perfect for streetwear fans.",
                        "Mother-of-Pearl Hairpin|Add a touch of glam with our mother-of-pearl hairpin (binyeo), crafted in Korea.",
                        "Eco-Friendly Fabric Pouch|Travel light with our eco-friendly Korean fabric pouch.",
                        "Tailored Hanbok Blazer|Achieve a polished look with our tailored hanbok-inspired blazer.",
                        "Seoul Skyline Denim Jacket|Show off your style with our denim jacket featuring Seoul skyline embroidery.",
                        "Cotton T-Shirts|Stay cool in our breathable cotton hanbok-modernized t-shirts.",
                        "Silk Maxi Dress|Make a statement with our printed silk maxi dress, inspired by Korean art.",
                        "Plush Bathrobe|Relax in luxury with our plush bathrobe, made from Korean microfiber.",
                        "Handmade Leather Belt|Step up your style with our handmade leather belt, a Seoul artisan creation.",
                        "Hanji Paper Umbrella|Protect yourself from the rain with our durable hanji paper umbrella.",
                        "Korean Wool Beanie|Stay warm with our wool beanie, knitted in a traditional Korean pattern."
                },
                {
                        "Seaweed Seasoning Blend|Elevate your meals with our Korean seaweed seasoning blend.",
                        "Kimchi Spice Mix|Enjoy the bold flavor of our kimchi spice mix, crafted in Seoul.",
                        "Cold-Pressed Sesame Oil|Savor the rich taste of our sesame oil, cold-pressed in Korea.",
                        "Rice Flour Kit|Bake traditional Korean rice cakes with our rice flour kit.",
                        "Mandoline Slicer|Grate fresh vegetables effortlessly with our stainless-steel Korean mandoline.",
                        "Wooden Chopsticks Set|Host with style using our hand-carved wooden chopsticks set, made in Korea.",
                        "Korean Cast-Iron Skillet|Cook evenly with our premium Korean cast-iron skillet.",
                        "Stone Bibimbap Bowl|Enjoy bibimbap with our stone bowl (dolsot), perfect for authentic Korean cooking.",
                        "Aged Soy Sauce|Enhance your dishes with our soy sauce aged in Korean clay jars.",
                        "Tteokbokki Sauce Starter|Make perfect tteokbokki with our easy-to-use Korean sauce starter kit.",
                        "Ceramic Banchan Plates|Serve side dishes elegantly with our ceramic banchan plates, handcrafted in Seoul.",
                        "Makgeolli Brass Cup Set|Enjoy makgeolli (rice wine) with our traditional Korean brass cup set.",
                        "Non-Stick Baking Mats|Bake like a pro with our non-stick baking mats featuring Korean motifs.",
                        "Pottery-Inspired Containers|Store food in our stackable Korean pottery-inspired glass containers.",
                        "Digital Kitchen Scale|Stay healthy with our digital kitchen scale, designed for precision cooking.",
                        "Chef's Knife Hybrid|Cut ingredients like a pro with our Japanese-Korean chef's knife hybrid."
                }
        };

        String[] categoryNames = {"K-Beauty", "Exotic Tea", "Fashion", "Gourmet"};

        for (int categoryIndex = 0; categoryIndex < productDetails.length; categoryIndex++) {
            String[] details = productDetails[categoryIndex];
            String categoryName = categoryNames[categoryIndex];

            Category category = categoryRepository.findByCategoryName(categoryName);
            if (category == null) {
                log.warn("Category not found for name: " + categoryName);
                continue;
            }

            for (int i = 0; i < details.length; i++) {
                String[] parts = details[i].split("\\|");
                String pname = parts[0];
                String pdesc = parts[1];

                Product product = Product.builder()
                        .pname(pname)
                        .pprice(100 * (i + 1))
                        .pdesc(pdesc)
                        .pqty(25 * (i + 1))
                        .shippingFee(i < 13 ? 3000 : 0)
                        .category(category)
                        .build();
                product.addImageString(UUID.randomUUID().toString() + "_" + "IMAGE1.jpg");
                product.addImageString(UUID.randomUUID().toString() + "_" + "IMAGE2.jpg");
                productRepository.save(product);
            }
        }
    }


//    ----------------------------------------------------------------

    @Test
    public void testRead2(){
        Long pno =1l;
        Optional<Product> result = productRepository.selectOne(pno);

        Product product = result.orElseThrow();

        log.info(product);
        log.info(product.getProductImageList());
    }

    @Commit
    @Transactional
    @Test
    public void testDelete(){
        Long pno =2l;
        productRepository.updateToDelete(pno,true);
    }

    @Test
    public void testUpdate(){
        Long pno =10l;

        Product product = productRepository.selectOne(pno).get();
        product.changeName("10번상품");
        product.changeDesc("10번상품 설명");
        product.changePrice(5000);

        product.clearList(); //이미지 파일 리스트 비움.

        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE1.jpg");
        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE2.jpg");
        product.addImageString(UUID.randomUUID().toString()+"_"+"IMAGE3.jpg");

        productRepository.save(product);

    }


}
