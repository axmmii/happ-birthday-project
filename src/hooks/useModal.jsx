import { useState, useCallback } from "react";

export function useModal() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const openModal = useCallback((imageSrc) => {
        setCurrentImage(imageSrc);
        setModalVisible(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setCurrentImage(null);
    }, []);

    return {
        isModalVisible,
        currentImage,
        openModal,
        closeModal,
    };
}
