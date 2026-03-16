// React
import { useCallback, useEffect, useState } from "react";

// Styles
import cls from "./ProductFormModal.module.scss";
import rootCls from "../../ModalRoot/ModalRoot.module.scss"


// Icons
import { ReactComponent as XIcon } from "@/assets/icons/x.svg";

// Hooks
import { useErrorState } from "@/store/useErrorState";
import { useModalState } from "@/store/useModalState";

// Utils
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { getImageUrl } from '@/utils/image';

// Hooks
import {
  useCreateProductQuery,
  useUpdateProductQuery,
} from "@/hooks/query/useProductQuery";
import { useGetCategoryQuery } from "@/hooks/query/useCategoryQuery";
import { useGetSellers } from "@/hooks/query/useSellersQuery";

// Components
import SelectModal from "@/components/elements/modals/SelectModal/SelectModal";
import Button from '@/components/ui/Button/Button';


function ProductFormModal() {
  const closeModal = useModalState((state) => state.closeModal);
  const { modalProps } = useModalState();
  const editProductData = modalProps.product;

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [productSeller, setProductSeller] = useState(null);

  const { data: categories } = useGetCategoryQuery();
  const { data: sellers } = useGetSellers();

  const error = useErrorState((state) => state.error);
  const setError = useErrorState((state) => state.setError);

  const isEditMode = Boolean(editProductData);

  const {
    mutate: createProduct,
    isPending: isCreatePending
  } = useCreateProductQuery();
  const {
    mutate: updateProduct,
    isPending: isUpdatePending
  } = useUpdateProductQuery();

  const isPending = isUpdatePending || isCreatePending;

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    setImageInput(file);
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);

      setImageInput(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmitProduct = useCallback(async () => {
    if (editProductData) {
      updateProduct({
        id: editProductData.id,
        name: nameInput,
        price: Number(priceInput),
        description: descriptionInput,
        rating: 0,
        categoryId: productCategory?.id,
        sellerId: productSeller?.id,
        image: imageInput,
      });
    } else if (
      productCategory &&
      productSeller &&
      nameInput &&
      priceInput &&
      descriptionInput &&
      imageInput
    ) {
      createProduct({
        name: nameInput,
        price: Number(priceInput),
        description: descriptionInput,
        categoryId: productCategory.id,
        sellerId: productSeller.id,
        image: imageInput,
      });
    } else {
      setError('Please fill in all fields')
    }
  }, [
    createProduct,
    descriptionInput,
    editProductData,
    imageInput,
    nameInput,
    priceInput,
    productCategory,
    productSeller,
    setError,
    updateProduct,
  ]);

  useEffect(() => {
    if (editProductData) {
      setNameInput(editProductData.name);
      setImagePreview(getImageUrl(editProductData.image));
      setProductSeller(editProductData.seller);
      setProductCategory(editProductData.category)
      setDescriptionInput(editProductData.description)
      setPriceInput(editProductData.price)
    } else {
      setNameInput("");
      setImagePreview(null);
    }
  }, [editProductData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmitProduct();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmitProduct]);

  return (
    <>
      <div className={rootCls.modalHeader}>
        <h2>{isEditMode ? "Update product" : "Create product"}</h2>
        <XIcon onClick={() => closeModal()} />
      </div>
      <div className={rootCls.modalBody}>
        <div className={rootCls.modalSection}>
          <div className={cls.selectWrapper}>
            <Button
              className={cls.selectButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryModalOpen(!isCategoryModalOpen);
                setIsSellerModalOpen(false);
              }}
              variant="white"
              data-modal-trigger
            >
              {
                productCategory?.icon &&
                <span>
                  <img
                    width="25px"
                    src={getImageUrl(productCategory?.icon)}
                    alt=""
                  />
                </span>
              }
              <span>
                {capitalizeFirstLetter(productCategory?.name) ??
                  "Select category"}
              </span>
              <span>{isCategoryModalOpen ? "↓" : "↑"}</span>
            </Button>
            <Button
              className={cls.selectButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsSellerModalOpen(!isSellerModalOpen);
                setIsCategoryModalOpen(false);
              }}
              variant="white"
            >
              <span>
                {capitalizeFirstLetter(productSeller?.name) ?? "Select seller"}
              </span>
              <span>{isSellerModalOpen ? "↓" : "↑"}</span>
            </Button>
            {isCategoryModalOpen && (
              <SelectModal
                items={categories}
                handleSelect={(item) => {
                  setProductCategory(item);
                  setIsCategoryModalOpen(false);
                }}
                onClose={() => setIsCategoryModalOpen(false)}
                selectedItem={productCategory}
                top={135}
                isSearchModal={true}
              />
            )}
            {isSellerModalOpen && (
              <SelectModal
                items={sellers}
                handleSelect={(item) => {
                  setProductSeller(item);
                  setIsSellerModalOpen(false);
                }}
                onClose={() => setIsSellerModalOpen(false)}
                selectedItem={productSeller}
                top={135}
                isSearchModal={true}
              />
            )}
          </div>
        </div>
        <div className={rootCls.modalSection}>
          <h3>Product name</h3>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div className={rootCls.modalSection}>
          <h3>Product description</h3>
          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            rows={5}
            className={cls.descriptionInput}
          />
        </div>
        <div className={rootCls.modalSection}>
          <h3>Product price ($)</h3>
          <input
            type="text"
            inputMode="decimal"
            value={priceInput}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d*\.?\d*$/.test(value)) {
                setPriceInput(value);
              }
            }}
            className={cls.priceInput}
          />
        </div>
        <div className={rootCls.modalSection}>
          <h3>Product image</h3>
          <label htmlFor="flieInput" className={cls.fileInputLabel}>
            <input
              id="flieInput"
              type="file"
              accept="image/*"
              className={cls.fileInput}
              onChange={(e) => handlePreviewImage(e)}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" />
            ) : (
              <span>Choose File</span>
            )}
          </label>
        </div>
        {error && <span className="errorText">{error}</span>}
        <div className={rootCls.modalFooter}>
          <Button 
            disabled={!!error || isPending} 
            onClick={() => handleSubmitProduct()}
            isLoading={isPending}
          >
            {isPending ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update product" : "Create product")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductFormModal;
