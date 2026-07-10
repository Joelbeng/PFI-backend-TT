import { readDocuments, readDocument, createDocument, updateDocument, deleteDocument } from "../modelos/products.models.js";

export const createProductService = async (producto) => {
    return await createDocument("productos", producto)
}

export const deleteProductService = async (id) => {
    console.log("Capa de servicios")
    return await deleteDocument("productos", id)
}

export const updateProductService = async (id, data) => {
    return await updateDocument("productos", id, data)
}

export const getProductByIdService = async (id) => {
    return await readDocument("productos", id);
};

export const getProductsByFilters = async ({ categoria, precio }) => {
    if (categoria === undefined && precio === undefined) {
        return await readDocuments("productos");
    }

    const products = await readDocuments("productos");
    return products.filter(product => {
        let match = true;

        if (categoria !== undefined) {
            match = match && product.categoria === categoria;
        }

        if (precio !== undefined) {
            match = match && product.precio <= precio;
        }

        return match;
    });
};