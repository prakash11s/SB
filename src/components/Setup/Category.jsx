import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import SetupServices from "../../services/Setup/setup.service";
import { setupCategory } from "../../store/action/Setup/setup.action";
import Loader from "../Common/Loader";
import { toast } from "react-toastify";

const Category = ({ prevStep, nextStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState(undefined);

  useEffect(() => {
    SetupServices.getCategory().then((response) => {
      if (response.data.status) {
        const { list, category_id } = response.data.data;
        setCategoryList(list);
        setCategoryId(category_id);
      }
    });
  }, []);

  const handleSubmit = () => {
    if(categoryId){
    //setIsLoading(true);
    const payload = { category_id:categoryId }
    let categoryName = categoryList.find((obj) => obj.id === categoryId).category_name;
    dispatch(setupCategory(payload,categoryName))
      .then((response) => {
        setIsLoading(false);
        if (response.status) {
          nextStep();
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
    }else{
      toast.error(t('CATEGORY_REQ'));
    }
  };

  return (
    <>
      <div className="row g-4 settings-section">
        <div className="col-12 col-md-12">
          <div className="app-card app-card-settings shadow-sm p-4">
          <h2 className="title mb-2">Select a Category</h2>
          <span className="subtitle">{t("CATEGORY_TEXT")}</span>
            <br />
            <br />
            <div className="app-card-body">
              <div className="row">
                {categoryList.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
                    >
                      <div
                        onClick={() => {
                          setCategoryId(category.id);
                        }}
                        className="service-list dashboard-service"
                      >
                        <a
                          className={`${
                            categoryId === category.id ? "active-category" : ""
                          }`}
                        >
                          <img
                            src={
                              category.services_primary_images
                                .category_image_path
                            }
                            alt={category.category_name}
                          />
                          <h4>{category.category_name}</h4>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="row justify-content-between">
                <div className="col-auto">
                  <button
                    onClick={prevStep}
                    type="button"
                    className="btn app-btn-secondary"
                  >
                    {t("PREV")}
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn app-btn-primary"
                  >
                    {isLoading ? <Loader type="dots" /> : t("NEXT")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
