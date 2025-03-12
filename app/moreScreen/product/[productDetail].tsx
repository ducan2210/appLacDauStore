import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Link, useLocalSearchParams, useRouter} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Slider from '@/components/slider/Slider';
import StarRating from '@/components/StarRating';
import {productReviewData} from '@/data/ProductReviewData';
import ProductReview from '@/components/productComponent/productReview';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnAddToCart from '@/components/BtnAddToCart';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import BtnAddToWishList from '@/components/BtnAddToWishList';
import {typeProduct, typeProductDetail} from '@/models/product.model';
import {typePromotion} from '@/models/promotion.model';
import {getPromotionByProductID} from '@/hooks/api/usePromotion';
import {
  getProductDetailById,
  getProductRecommend,
} from '@/hooks/api/useProduct';
import {typeReview, typeReviewByProductID} from '@/models/review.model';
import {getReviewByProductID} from '@/hooks/api/useReview';
import ListProductReview from '@/components/productComponent/listProductReview';
import Loading from '@/components/Loading';
import ListProduct from '@/components/productComponent/listProduct';

const ProductDetail = () => {
  const user = useSelector((state: RootState) => state.user?.user);
  const [products, setProducts] = useState<typeProductDetail>();
  const {productDetail} = useLocalSearchParams();
  const [promotion, setPromotion] = useState<typePromotion>();
  const [reviews, setReviews] = useState<typeReviewByProductID>();
  const [isLoading, setIsLoading] = useState(false);
  const [productRecommend, setProductRecommend] = useState<typeProduct[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const product = await getProductDetailById(Number(productDetail));
      if (product) setProducts(product);
      const reviewsData = await getReviewByProductID(productDetail.toString());
      if (reviewsData) setReviews(reviewsData);
      setIsLoading(false);
    };

    findPromotion(Number(productDetail));
    fetchData();
  }, [productDetail]);

  useEffect(() => {
    const fetchRecommend = async () => {
      if (products) {
        const recommend = await getProductRecommend(
          products.product_id,
          products.category_id,
          products.name,
          products.supplier_id,
        );
        if (recommend) setProductRecommend(recommend);
      }
    };
    fetchRecommend();
  }, [products]);

  const findPromotion = async (product_id: number) => {
    setIsLoading(true);
    const promotionData = await getPromotionByProductID(product_id);
    if (promotionData) setPromotion(promotionData);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading visible={isLoading} text="Loading..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <BtnBackScreen />
          <Text style={styles.title}>{products?.name}</Text>
        </View>
      </View>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Slider />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{products?.name}</Text>
          {user && (
            <BtnAddToWishList
              user_id={user.user_id}
              product_id={products?.product_id as number}
            />
          )}
        </View>

        {products?.discount_price ? (
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>${products.discount_price}</Text>
            <View style={styles.originalPriceContainer}>
              <Text style={styles.originalPrice}>${products.price}</Text>
              <Text style={styles.discountPercent}>
                {Math.floor(promotion?.discount_percent as number)}% Off
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.price}>${products?.price}</Text>
        )}

        {/* Chèn thông tin sản phẩm tại đây */}
        <View style={styles.productDetails}>
          <Text style={styles.detailTitle}>Product Details</Text>
          <Text style={styles.detailText}>
            {products?.description ||
              'No description available for this product.'}
          </Text>
          {products?.Supplier && (
            <Text style={styles.detailText}>
              Supplier: {products.Supplier.name || 'Unknown Supplier'}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Review Product</Text>
            <Link
              href={{
                pathname: '/moreScreen/product/productReview/[productReview]',
                params: {productReview: 'def'},
              }}
              asChild>
              {reviews?.reviews && reviews.reviews.length && (
                <TouchableOpacity>
                  <Text style={styles.seeMore}>See More</Text>
                </TouchableOpacity>
              )}
            </Link>
          </View>
          <View style={styles.ratingContainer}>
            <StarRating rating={reviews?.average_rating || 0} />
            <Text style={styles.ratingText}>
              {reviews?.average_rating || 0} ({reviews?.total_review} Review)
            </Text>
          </View>
          {reviews?.reviews && reviews.reviews.length ? (
            <ListProductReview data={reviews?.reviews || []} />
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.noReviewsText}>
                This product has no reviews yet
              </Text>
            </View>
          )}
        </View>

        {productRecommend && productRecommend.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>You Might Also Like</Text>
            <ListProduct data={productRecommend} />
          </View>
        )}

        {user && products?.product_id && (
          <BtnAddToCart
            user_id={user?.user_id}
            product_id={products?.product_id}
            quantity={1}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(6),
    paddingHorizontal: wp(4),
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 2,
    marginBottom: hp(1),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  title: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#223263',
    marginLeft: wp(3),
  },
  body: {
    flex: 1,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
    padding: wp(2),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productName: {
    fontSize: wp(6.5),
    fontWeight: 'bold',
    color: '#223263',
  },
  wishListButton: {
    padding: wp(2),
  },
  priceContainer: {
    marginTop: hp(1),
    padding: wp(2),
    backgroundColor: '#FFF3F3',
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountPrice: {
    fontSize: wp(6),
    color: '#FF5733',
    fontWeight: '700',
  },
  originalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: hp(0.5),
  },
  originalPrice: {
    fontSize: wp(4),
    color: '#9098B1',
    textDecorationLine: 'line-through',
    marginHorizontal: wp(1),
  },
  discountPercent: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: '#FF5733',
  },
  price: {
    fontSize: wp(5),
    color: '#40BFFF',
    fontWeight: '700',
    marginTop: hp(1),
    padding: wp(2),
    backgroundColor: '#E6F0FA',
    borderRadius: wp(3),
    textAlign: 'center',
  },
  productDetails: {
    marginTop: hp(2),
    padding: wp(3),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  detailTitle: {
    fontSize: wp(5.5),
    fontWeight: '600',
    color: '#223263',
    marginBottom: hp(1),
  },
  detailText: {
    fontSize: wp(4),
    color: '#666666',
    lineHeight: wp(5),
    marginBottom: hp(0.5),
  },
  section: {
    marginTop: hp(2),
    padding: wp(2),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: wp(5.5),
    fontWeight: '600',
    color: '#223263',
  },
  seeMore: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#40BFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: wp(3.5),
    color: '#9098B1',
    marginLeft: wp(2),
  },
  addToCartButton: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  noReviewsText: {
    fontSize: wp(4),
    color: '#9098B1',
    marginTop: hp(1),
  },
});
