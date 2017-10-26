function [Output] = SPOG_Code_Predix(tags)
%% Code for Descriptive Analysis of SPOG Data
% Written by - Poonam Bhoite
% On - 3/22/2017

    brutxasmodem_tx = tags.brutxasmodem_tx;
    brdrxasmodem_rx = tags.brdrxasmodem_rx;
    
    scatterhist(brutxasmodem_tx,brdrxasmodem_rx,'group',brstreet);figure(gcf)
    savefig('SPOG_Code_Predix_Plot.fig');
    
    rx = brdrxasmodem_rx;
    rx(isnan(brdrxasmodem_rx)) = [];
    Rx_Mean = mean(rx);
    Rx_Std = std(rx);
    tx = brutxasmodem_tx;
    tx(isnan(brutxasmodem_tx)) = [];
    Tx_Mean = mean(tx);
    Tx_Std = std(tx);
    
    %% As per Chebyshev's theoren - 
    Output = cell(2,7);
    Output(1,:) = {'Signal' 'Outer Lower' 'Middle Lower' 'Inner Lower' 'Outer Upper' 'Middle Upper' 'Inner Upper'};
    Output(2:3,1) = {'Receive Thresholds' 'Transmit Thresholds'};
    
    Results = [Rx_Mean - 3*Rx_Std Rx_Mean - 2*Rx_Std Rx_Mean - Rx_Std Rx_Mean + Rx_Std Rx_Mean + 2*Rx_Std Rx_Mean + 3*Rx_Std ;...
    Tx_Mean - 3*Tx_Std Tx_Mean - 2*Tx_Std Tx_Mean - Tx_Std Tx_Mean + Tx_Std Tx_Mean + 2*Tx_Std Tx_Mean + 3*Tx_Std ]; 
    
    Output(2:end,2:end) = num2cell(Results);           

end