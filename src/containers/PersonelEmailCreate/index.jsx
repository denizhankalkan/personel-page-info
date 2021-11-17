import {
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    // / Typography,
  } from '@material-ui/core';
  import Button from '@material-ui/core/Button';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import PropTypes from 'prop-types';
  import React, { useState } from 'react';
  import { useQuery } from 'react-query';
  import { useLocation } from 'react-router-dom';
  import { Customers } from 'utils/api';
  import { status, useCustomizedSnackbar } from 'utils/snackbar';
  
  const FormDialog = (props) => {
    const { emailId } = props;
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [RecDate, setRecDate] = useState(new Date());
    const [Email, setEmail] = useState(null);
    // const [EmailType, setEmailType] = useState(null);
    const [InactiveFlag, setInactiveFlag] = useState(null);
    // const code = location?.state?.customerCode;
    const perCode = 'Percode01';
    const { snackbar } = useCustomizedSnackbar();
  
    const EmailCreate = useQuery(
      'EmailCreate',
      async () => {
        const result = await Customers.EmailCreate(perCode, EmailCreateInputModel);
        console.log('Result', result);
        return result;
      },
      {
        retry: false,
        enabled: false,
      },
    );
  
    const EmailCreateInputModel = {
      PerCode: perCode,
      Email,
      InactiveFlag,
      RecDate,
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const onChangeEmail = (event) => {
      setEmail(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const EmailType = [
      { title: 'Kişisel' },
      { title: 'İş' },
      { title: 'Yakını' },
    ];
  
    const handlePrimaryClick = async () => {
      const response = await EmailCreate.refetch();
      console.log('Response', response);
      if (response.isSuccess) {
        snackbar('Email Kaydedildi', status.SUCCESS);
      }
      if (response.error) {
        snackbar('Email Kaydı Başarısız', status.ERROR);
      }
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Yeni Ekle
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Bilgileri tamamlayınız</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              onChange={onChangeEmail}
              value={Email}
            />
            <Grid container style={{ marginTop: 20 }}>
              <Grid>
                <FormControlLabel
                  style={{ paddingTop: '15px' }}
                  control={
                    <Checkbox
                      checked={InactiveFlag}
                      onClick={() => setInactiveFlag(!InactiveFlag)}
                    />
                  }
                  label="Pasif"
                />
              </Grid>
              <Grid>
                <Autocomplete
                  id="combo-box-demo"
                  options={EmailType}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Email Tip" />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              İptal 
            </Button>
            <Button onClick={handlePrimaryClick} color="primary">
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  FormDialog.propTypes = {
    code: PropTypes.string,
    emailId: PropTypes.number,
  };
  
  export default FormDialog;