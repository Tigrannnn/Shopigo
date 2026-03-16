// React
import { useEffect, useState, useLayoutEffect } from "react";

// Styles
import cls from "./ModalRoot.module.scss";

// Hooks
import { useModalState } from "@/store/useModalState";
import { useErrorState } from "@/store/useErrorState";
import useClickOutside from "@/hooks/useClickOutside";

// Components
import CategoryFormModal from "../admin/CategoryFormModal/CategoryFormModal";
import ProductFormModal from "../admin/ProductFormModal/ProductFormModal";
import SellerFormModal from "../admin/SellerFormModal/SelerFormModal";
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfileModal";
import LogoutModal from "../LogoutModal/LogoutModal";
import ShareModal from "../ShareModal/ShareModal";
import CategoryModal from "../CategoryModal/CategoryModal";
import SearchModal from "../SearchModal/SearchModal";

// Utils
import { MODALS } from "@/utils/constants/modals";


function ModalRoot() {
  // Modal
  const activeModal = useModalState((state) => state.activeModal);
  const closeModal = useModalState((state) => state.closeModal);
  const clearError = useErrorState((state) => state.clearError);
  const [renderedModal, setRenderedModal] = useState(null);

  // Close modal on click outside
  // ignore clicks on elements marked with data-modal-trigger (header buttons, inputs, etc.)
  const modalRef = useClickOutside(closeModal, { ignoreSelector: '[data-modal-trigger]' });

  // Lock background scroll while modal is open
  useLayoutEffect(() => {
    let timeoutId;

    if (activeModal) {
      setRenderedModal(activeModal);
    } else {
      timeoutId = window.setTimeout(() => setRenderedModal(null), 300);
    }

    document.body.style.overflow = activeModal ? "hidden" : "";

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // Clear error when modal changes
  useEffect(() => {
    clearError();
  }, [activeModal, clearError]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal, closeModal]);

  // select content based on the active modal name
  let content = null;
  switch (renderedModal) {
    case MODALS.CHANGE_PROFILE:
      content = <ChangeProfileModal />;
      break;
    case MODALS.LOGOUT:
      content = <LogoutModal />;
      break;
    case MODALS.SHARE:
      content = <ShareModal />;
      break;
    case MODALS.ADD_PRODUCT:
      content = <ProductFormModal />;
      break;
    case MODALS.ADD_CATEGORY:
      content = <CategoryFormModal />;
      break;
    case MODALS.ADD_SELLER:
      content = <SellerFormModal />;
      break;
    case MODALS.CATEGORY_MODAL:
      content = <CategoryModal />;
      break;
    case MODALS.SEARCH_MODAL:
      content = <SearchModal />;
      break;
    default:
      content = null;
  }

  if (!renderedModal) return null

  const isCategoryModal = renderedModal === MODALS.CATEGORY_MODAL;
  const isSearchModal = renderedModal === MODALS.SEARCH_MODAL;
  const isHeaderModal = isCategoryModal || isSearchModal;

  return (
    <>
      <div
        className={`
          ${cls.overlay}
          ${activeModal ? cls.open : ""}
          ${isHeaderModal ? cls.headerModalOverlay : ""}
        `}
      />

      <div
        key={renderedModal}
        ref={modalRef}
        className={`
          ${cls.modalShell}
          ${cls[renderedModal]}
          ${activeModal ? cls.open : ""}
          ${isCategoryModal ? cls.categoryModal : ""}
          ${isSearchModal ? cls.searchModal : ""}
        `}
      >
        {content}
      </div>
    </>
  );
}

export default ModalRoot;
