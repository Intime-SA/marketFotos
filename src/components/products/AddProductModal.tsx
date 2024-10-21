import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Product, NewProduct } from "@/src/domain/entitys/definitions";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: NewProduct | Product) => void;
  productToEdit: Product | null;
};

export function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  productToEdit,
}: AddProductModalProps) {
  const [title, setTitle] = useState("");
  const [comision, setComision] = useState("porcentaje");
  const [monto, setMonto] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    comision: "",
    monto: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setComision(productToEdit.comision);
      setMonto(productToEdit.monto.toString());
    } else {
      setTitle("");
      setComision("porcentaje");
      setMonto("");
    }
  }, [productToEdit]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      comision: "",
      monto: "",
    };

    if (title.trim() === "") {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (comision === "") {
      newErrors.comision = "Comision type is required";
      isValid = false;
    }

    if (monto.trim() === "") {
      newErrors.monto = "Monto is required";
      isValid = false;
    } else if (parseFloat(monto) <= 0) {
      newErrors.monto = "Monto must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const productData = {
        title,
        comision,
        monto: Number(monto),
      };

      if (productToEdit) {
        onAddProduct({ ...productData, id: productToEdit.id });
      } else {
        onAddProduct(productData);
      }

      setTitle("");
      setComision("porcentaje");
      setMonto("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {productToEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comision" className="text-right">
                Comision Type
              </Label>
              <Select value={comision} onValueChange={setComision}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select comision type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="porcentaje">Porcentaje</SelectItem>
                  <SelectItem value="precio_final">Precio Final</SelectItem>
                </SelectContent>
              </Select>
              {errors.comision && (
                <p className="text-red-500 text-sm mt-1 col-span-3">
                  {errors.comision}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monto" className="text-right">
                Monto
              </Label>
              <div className="col-span-3">
                <Input
                  id="monto"
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  step="0.01"
                  min="0.01"
                  className={errors.monto ? "border-red-500" : ""}
                />
                {errors.monto && (
                  <p className="text-red-500 text-sm mt-1">{errors.monto}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {productToEdit ? "Update" : "Add"} Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
