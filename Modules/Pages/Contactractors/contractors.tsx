import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { ContractorService,  ContractorServiceType } from '../../../lib/services/contractor';
import { Contractor } from '../../../types/data-types/Contractor';
import styles from './Contractors.module.css'

const contractorsPage : React.FC =() => {

  const contractorService :ContractorServiceType = ContractorService;

  // start of use State hooks

  const [contractors ,setContractors] = useState<Array<Contractor>>([])

  const [loading,setLoading] = useState<boolean>(false);
  const [loadingStore,setLoadingStore] = useState<boolean>(true);


  // start of use Effects
  useEffect(() => {
    getContractors();
    append('')
  },[])


  // start of usehook form

  const { register,handleSubmit,control,reset, formState: { errors }, } = useForm({
      mode: "onBlur",
  })


  const { append, remove, fields } = useFieldArray({
    control,
    name: 'services'
  });

  const getContractors : CallableFunction  = async ()  => {
    try{
      setLoading(true);
      const response = await contractorService.getContractorsAPI();
      setContractors([...response?.contractor ?? []]);
    }catch(ex){
    }finally{
      setLoading(false)
    }
  }


  const [noOfServices,setNoOfServices] = useState<number>(1);

  const addService : CallableFunction = () => {
    append("")
  }


  const storeContractor : CallableFunction  = async (contractorData : FieldValues)  => {
    const response = await contractorService.getContractorsAPI();
    let contractors = response?.contractors ?? [];
    contractors = [...contractors,contractorData];
    setContractors(contractors);

    try{
      setLoading(true)
      const response = await contractorService.storeContractorsAPI(contractors);
      reset();
      append("");
      alert("A new Contractor has been created");
    }catch(ex){
      alert("A new Contractor could not be created");
    }finally{
      setLoading(false)
    }
  }

  const onsubmit = (data :FieldValues) => {
    storeContractor(data)
  }
  return (
    <div className={styles.page}>
      <div className="w-full md:w-4/5 m-auto">
        <div className={styles.input_section}>
          <div className="header">
            <h4 className={ styles.heading_text }>Add new Contractor</h4>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className={styles.input_group}>
              <label htmlFor="name" className={styles.label_style}>Name</label>
              <input {...register('name',{required: true})} placeholder={'Name'} className={styles.input_text}></input>
              {errors.name && <p className={styles.error_label}> Name is required.</p>}
            </div>
            <div className={styles.input_group}>
              <label htmlFor="email" className={styles.label_style}>Email</label>
              <input {...register('email',{required:true})} placeholder={'Email'} className={styles.input_text}></input>
              {errors.email && <p className={styles.error_label}> Email is required.</p>}
            </div>
            <div className={styles.input_group}>
            <label htmlFor="email" className={styles.label_style}>Telephone</label>
              <input {...register('telephone',{required:true})} placeholder={'Telephone'} className={styles.input_text}></input>
              {errors.telephone && <p className={styles.error_label}> Telephone is required.</p>}
            </div>
            <div className={styles.input_group}>
              <div className="flex justify-between mb-2">
                <label htmlFor="" className={styles.label_style}>{'Services'}</label>
                <button className={`${styles.icon_button} ${styles.success_icon_button}`} onClick={(value) => addService()}><Add></Add></button>
              </div>
              {fields.map((field, index) => (
                <div className={styles.input_group} key={field.id}>
                  <div className="flex">
                    <input
                      key={field.id} 
                      placeholder={'Add a Service'}
                      className={styles.input_text}
                      {...register(`services.${index}`,{required:true})} 
                    />
                    <button className={`${styles.icon_button} ${styles.delete_icon_button} ml-3`} onClick={(value) => remove(index)}>
                      <Delete/>
                    </button>
                  </div>
                </div>
                  
              ))}
            </div>
            
            <button className='bg-green-600 rounded-md px-8 py-2 text-white' type="submit">Store</button>
          </form>
        </div>
        <div className={styles.table_list}>
          <table className={styles.contractor_table}>
            <thead>
              <tr>
                <th>ID.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Services</th>
              </tr>
            </thead>
            <tbody>
              {
                loading && <tr>
                  <td colSpan={5} className={styles.loading_contractors}> Loading Contractors</td>
                </tr>
              }
              {
                (!loading && contractors.length > 0) && contractors.map((contractor : Contractor,index : number) => {
                  return (<tr key={`contractor_item_${index}`}>
                    <td>{index + 1}</td>
                    <td>{ contractor.name}</td>
                    <td>{ contractor.email}</td>
                    <td>{ contractor.telephone}</td>
                    <td>
                      {
                        contractor.services.length <= 0 && <td>No Services available</td>
                      }
                      {
                        contractor.services.length >0 && <div>
                          {contractor.services.map((service:string,service_index :number) => <div key={`service_${index}_service_${service_index}`}>{service}</div>)}
                        </div>
                      }
                    </td>
                  </tr>)
                })
              }
              { (!loading && contractors.length <= 0) && <tr>
                  <td colSpan={5} className={styles.loading_contractors}> No contractors found yet.</td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default contractorsPage