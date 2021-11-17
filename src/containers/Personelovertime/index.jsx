/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    Card
  } from '@material-ui/core';
  import DatePicker from '@mui/lab/DatePicker';

  import DateTimePicker from '@mui/lab/DateTimePicker';
  import LoadingIndicator from 'components/LoadingIndicator';
  import PropTypes from 'prop-types';
  import React, { useState } from 'react';
  import { FormattedMessage, useIntl } from 'react-intl';
  import { useQuery } from 'react-query';
  import { useSelector } from 'react-redux';
  import { withRouter } from 'react-router-dom';
  
  import styles from './index.style';
  import messages from './messages';
  import Wrapper from './Wrapper';
  
  const OverTime = ({ history, id }) => {
    const [BegDate, setBegDate] = useState(null);
    const [EndDate, setEndDate] = useState(null);
    const [DocDesc, setDocDesc] = useState('');
    const [TrxDate, setTrxDate] = useState(new Date());
    const [notesLength, setNotesLength] = React.useState('200/200');
    const [perData, setPerData] = React.useState({});
  
    const useStyle = makeStyles(styles);
    const classes = useStyle();
  
    const intl = useIntl();
    const reason = useIntl().formatMessage(messages.reason);
    const errorText = <FormattedMessage {...messages.errorMessage} />;
  
    const user = useSelector((state) => state.global.user);
  
   // const { snackbar } = useCustomizedSnackbar();
  
    const OverTimePerInfo = useQuery('OverTimePerInfo', async () => {
      const result = await OverTimePerInfo(user.userId);
      setPerData({
        PerCode: result.result.perCode,
        PerName: result.result.perName,
        UserId: result.result.userId,
      });
      return result;
    });
  
    const OverTimeCreate = useQuery(
      'OverTimeCreate',
      async () => {
        const result = await OverTimeCreate(OverTimeCreateInputModel);
        return result;
      },
      {
        retry: false,
        enabled: false,
      },
    );
  
    const resultMs = Math.abs(EndDate - BegDate);
   // const hourOnDisplay = Math.round(resultMs / 3600000);
    //const minuteOnDisplay = Math.round(((resultMs % 86400000) % 3600000) / 60000);
    const calcMinute = Math.round(resultMs / (1000 * 60));
  
    const OverTimeCreateInputModel = {
      PerCode: perData.PerCode,
      PerName: perData.PerName,
      TrxDate,
      BegDate,
      EndDate,
      OverTimeMinute: calcMinute,
      DocDesc,
      UserId: perData.UserId,
    };
  
    const onChangeDocDesc = (event) => {
      setDocDesc(event.target.value);
      setNotesLength(`${199 - (DocDesc !== null ? DocDesc?.length : 0)} / 200`);
    };
  
    const onChangeBegDate = (date) => {
      setBegDate(date);
    };
  
    const onChangeTodayDate = (date) => {
      setTrxDate(date);
    };
  
    const onChangeEndDate = (date) => {
      setEndDate(date);
    };
  
    const handlePrimaryClick = async () => {
      if (
        OverTimeCreateInputModel.BegDate != null &&
        OverTimeCreateInputModel.EndDate != null &&
        OverTimeCreateInputModel.DocDesc !== ''
      ) {
        const response = await OverTimeCreate.refetch();
        if (response.isSuccess) {
          history.push(`/personelInfo`);
        }
        if (response.isError) {
          const validationArray = response.error.response.result?.validation;
          //ArrayFunction(validationArray);
        }
      } 
    };
  
    // function ArrayFunction(validation) {
    //   validation.map((item) => {
    //     return validation;
    //   });
    // }
  
    const handleSecondaryClick = () => {
      history.push(`/personel-info`);
    };
  
    if (OverTimePerInfo.isLoading) {
      return (
        <Card title={<FormattedMessage {...messages.title} />}>
          <LoadingIndicator />
        </Card>
      );
    }
  
    if (OverTimePerInfo.isError) {
      return (
        <Card title={<FormattedMessage {...messages.title} />}>
          <Paper>
            <Link
              component="button"
              variant="body2"
              style={{ left: 20 }}
              onClick={() => {
                history.push(`/profile`);
              }}
            >
              <Grid className={classes.link}>
                <FormattedMessage {...messages.personelErrorMessage} />
              </Grid>
            </Link>
          </Paper>
        </Card>
      );
    }
  
    return (
      <>
        <Wrapper title={messages.title}>
          <Paper>
            <Grid item spacing={2} container>
              <Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      id="standard-basic"
                      label={<FormattedMessage {...messages.userCode} />}
                      value={OverTimePerInfo.data.result.perCode}
                      InputProps={{
                        readOnly: true,
                        style: { fontSize: 15 },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputvariant="outlined"
                      className={classes.userCode}
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      id="filled-read-only"
                      label={<FormattedMessage {...messages.userName} />}
                      value={OverTimePerInfo.data.result.perName}
                      InputProps={{
                        readOnly: true,
                        style: { fontSize: 15 },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputvariant="outlined"
                      className={classes.user}
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <DatePicker
                      id="today-date"
                      inputVariant="outlined"
                      label={<FormattedMessage {...messages.date} />}
                      value={TrxDate}
                      readOnly
                      InputProps={{
                        readOnly: true,
                        style: { height: 45 },
                      }}
                      onChange={onChangeTodayDate}
                      className={classes.todayDate}
                    />
                  </Grid>
                </Grid>
  
                <Grid container spacing={2} style={{ marginTop: 20 }}>
                  <Grid item xs={4}>
                    <DateTimePicker
                      id="start-date"
                      label={<FormattedMessage {...messages.startDate} />}
                      value={BegDate}
                      disableFuture
                      onChange={onChangeBegDate}
                      inputVariant="outlined"
                      className={classes.dateTimePickerLeft}
                      inputProps={{
                        style: { height: '25px' },
                      }}
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <DateTimePicker
                      id="end-date"
                      inputVariant="outlined"
                      className={classes.dateTimePickerRight}
                      inputProps={{
                        style: { height: '25px', left: 10 },
                      }}
                      disableFuture
                      label={<FormattedMessage {...messages.endDate} />}
                      value={EndDate}
                      onChange={onChangeEndDate}
                      error={EndDate < BegDate && EndDate !== null}
                      helperText={
                        EndDate < BegDate && EndDate !== null ? errorText : null
                      }
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        style: { height: 10 },
                      }}
                      autoComplete="off"
                      variant="outlined"
                      label={<FormattedMessage {...messages.time} />}
                      id="filled-read-only-input"
                      
                      className={classes.timeStyle}
                    />
                  </Grid>
                </Grid>
  
                <Grid container spacing={2} style={{ marginTop: 40 }}>
                  <Grid item xs={12}>
                    <TextField
                      id="standard"
                      label={`${reason}  ${notesLength}`}
                      variant="outlined"
                      autoComplete="off"
                      inputProps={{
                        style: { height: 30 },
                      }}
                      onChange={onChangeDocDesc}
                      value={DocDesc}
                      className={classes.reason}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    id={id}
                    color="primary"
                    variant="contained"
                    className={classes.primary}
                    onClick={handlePrimaryClick}
                  >
                    {<FormattedMessage {...messages.save} />}
                  </Button>
  
                  <Button
                    id={id}
                    color="primary"
                    variant="outlined"
                    className={classes.cancel}
                    onClick={handleSecondaryClick}
                  >
                    {<FormattedMessage {...messages.cancel} />}
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                alignContent="space-between"
                alignItems="center"
              >
                <Grid />
              </Grid>
            </Grid>
          </Paper>
        </Wrapper>
      </>
    );
  };
  
  OverTime.propTypes = {
    overTimePerInfo: PropTypes.arrayOf(PropTypes.shape({})),
    label: PropTypes.string,
    onClick: PropTypes.func,
    userId: PropTypes.string,
    error: PropTypes.string,
    onChangeInputsVisible: PropTypes.func,
    isLoading: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    id: PropTypes.string,
    validationErrors: PropTypes.shape({}),
    OverTimeCreateInputModel: PropTypes.object,
  };
  
  OverTime.defaultProps = {
    validationErrors: {},
  };
  
  export default withRouter(OverTime);